ALTER TABLE public.students
  ADD COLUMN IF NOT EXISTS institute text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS branch text NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_students_institute ON public.students(institute);
CREATE INDEX IF NOT EXISTS idx_students_branch ON public.students(branch);