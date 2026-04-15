
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'teacher', 'student');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by authenticated users" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usn TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  class TEXT NOT NULL,
  section TEXT NOT NULL DEFAULT 'A',
  roll_no INTEGER NOT NULL,
  gender TEXT NOT NULL DEFAULT 'Male',
  phone TEXT,
  guardian_name TEXT,
  guardian_phone TEXT,
  address TEXT,
  date_of_birth DATE,
  admission_date DATE DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'Active',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students viewable by authenticated" ON public.students
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Teachers and admins can insert students" ON public.students
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

CREATE POLICY "Teachers and admins can update students" ON public.students
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'teacher'));

-- Teachers table
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  phone TEXT,
  experience_years INTEGER DEFAULT 0,
  qualification TEXT,
  classes TEXT,
  status TEXT NOT NULL DEFAULT 'Active',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers viewable by authenticated" ON public.teachers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage teachers" ON public.teachers
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Attendance records
CREATE TABLE public.attendance_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  class TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'present',
  marked_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(student_id, date)
);

ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Attendance viewable by authenticated" ON public.attendance_records
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Teachers can mark attendance" ON public.attendance_records
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Teachers can update attendance" ON public.attendance_records
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  );
  -- Default role: assign 'admin' to first user, otherwise no default role
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Timestamp update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample students
INSERT INTO public.students (usn, name, class, section, roll_no, gender, phone, guardian_name, guardian_phone, status) VALUES
  ('USN001', 'Priya Sharma', '10', 'A', 1, 'Female', '9876543210', 'Mr. Sharma', '9876543200', 'Active'),
  ('USN002', 'Rahul Verma', '10', 'A', 2, 'Male', '9876543211', 'Mr. Verma', '9876543201', 'Active'),
  ('USN003', 'Anita Das', '9', 'B', 5, 'Female', '9876543212', 'Mr. Das', '9876543202', 'Active'),
  ('USN004', 'Vikram Singh', '10', 'B', 3, 'Male', '9876543213', 'Mr. Singh', '9876543203', 'Active'),
  ('USN005', 'Meera Patel', '8', 'A', 7, 'Female', '9876543214', 'Mr. Patel', '9876543204', 'Inactive'),
  ('USN006', 'Arjun Reddy', '9', 'A', 4, 'Male', '9876543215', 'Mr. Reddy', '9876543205', 'Active'),
  ('USN007', 'Kavya Nair', '10', 'A', 8, 'Female', '9876543216', 'Mrs. Nair', '9876543206', 'Active'),
  ('USN008', 'Rohan Gupta', '8', 'B', 2, 'Male', '9876543217', 'Mr. Gupta', '9876543207', 'Active'),
  ('USN009', 'Sneha Iyer', '9', 'B', 6, 'Female', '9876543218', 'Mr. Iyer', '9876543208', 'Active'),
  ('USN010', 'Aditya Kumar', '10', 'B', 1, 'Male', '9876543219', 'Mr. Kumar', '9876543209', 'Active');

-- Insert sample teachers
INSERT INTO public.teachers (name, subject, phone, experience_years, qualification, classes, status) VALUES
  ('Mrs. Sunita Gupta', 'Mathematics', '9812345670', 12, 'M.Sc Mathematics', '9-A, 10-A, 10-B', 'Active'),
  ('Mr. Rajesh Kumar', 'Physics', '9812345671', 8, 'M.Sc Physics', '10-A, 10-B, 11-A', 'Active'),
  ('Ms. Priya Menon', 'English', '9812345672', 6, 'M.A English', '8-A, 8-B, 9-A', 'Active'),
  ('Mr. Anil Sharma', 'Chemistry', '9812345673', 15, 'M.Sc Chemistry', '10-A, 11-A, 11-B', 'Active'),
  ('Mrs. Deepa Nair', 'Biology', '9812345674', 10, 'M.Sc Biology', '9-B, 10-B', 'On Leave'),
  ('Mr. Suresh Rao', 'History', '9812345675', 9, 'M.A History', '8-A, 9-A, 9-B', 'Active'),
  ('Ms. Anjali Verma', 'Computer Science', '9812345676', 5, 'M.Tech CS', '10-A, 10-B, 11-A', 'Active'),
  ('Mr. Kiran Joshi', 'Hindi', '9812345677', 11, 'M.A Hindi', '8-A, 8-B, 9-A, 9-B', 'Active');
