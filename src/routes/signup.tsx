import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import heroImg from "@/assets/signup-hero.jpg";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Sign Up — INDDIA ERP" },
      { name: "description", content: "Create your INDDIA ERP account — complete school management in minutes." },
    ],
  }),
});

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [accept, setAccept] = useState(true);
  const [role, setRole] = useState<"student" | "teacher" | "admin">("student");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) return setError("Please fill all fields");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    if (password !== confirm) return setError("Passwords do not match");
    if (!accept) return setError("Please accept Terms & Conditions");
    setLoading(true);
    setError("");
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, requested_role: role } },
      });
      if (signUpError) setError(signUpError.message);
      else navigate({ to: "/dashboard" });
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left form panel */}
      <div className="flex w-full flex-col justify-between px-6 py-8 lg:w-1/2 lg:px-16">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            IE
          </div>
          <span className="text-xl font-bold text-foreground">INDDIA<span className="text-primary">ERP</span></span>
        </div>

        <div className="mx-auto w-full max-w-sm py-8">
          <p className="text-sm text-muted-foreground">It takes less than a minute to start managing your school like a pro!</p>
          <p className="mt-2 text-sm font-semibold text-foreground">Three Two <span className="text-primary">Online.</span></p>
          <h1 className="mt-6 text-3xl font-bold text-primary">Create Account<span className="text-foreground">.</span></h1>

          {error && (
            <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
          )}

          <form onSubmit={handleSignup} className="mt-6 space-y-5">
            <Field icon="👤">
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </Field>

            <Field icon="✉️">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </Field>

            <Field icon="🔒" trailing={
              <button type="button" onClick={() => setShowPwd((s) => !s)} className="text-muted-foreground hover:text-foreground" aria-label="Toggle password">
                {showPwd ? "🙈" : "👁"}
              </button>
            }>
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </Field>

            <Field icon="🔒">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </Field>

            {/* Role */}
            <div>
              <label className="mb-2 block text-xs font-medium text-muted-foreground">I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {(["student", "teacher", "admin"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`rounded-lg border px-2 py-2 text-xs font-medium capitalize transition-colors ${
                      role === r ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    {r === "student" ? "🎓" : r === "teacher" ? "👩‍🏫" : "🔑"} {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms toggle */}
            <label className="flex items-center gap-3 text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() => setAccept((a) => !a)}
                className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${accept ? "bg-primary" : "bg-muted"}`}
                aria-pressed={accept}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${accept ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
              Accept our <span className="font-medium text-primary">Terms &amp; Conditions</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-50"
            >
              <span className="text-primary">➤</span> {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">🔒 Login</Link>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">By signing up you agree to our Terms.</p>
        </div>

        <div />
      </div>

      {/* Right hero panel */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/70 lg:flex lg:w-1/2">
        <div className="relative z-10 flex w-full flex-col justify-center p-10 text-primary-foreground">
          <div className="flex justify-end">
            <Link to="/login" className="inline-flex items-center gap-1.5 rounded-lg bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow">
              🔒 Login
            </Link>
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-4xl font-extrabold leading-tight">Free Forever!</h2>
            <p className="mx-auto mt-4 max-w-md text-lg leading-snug">
              Create your school <span className="font-bold text-white/90 underline decoration-white/40">dashboard</span> and start managing <span className="font-bold text-white/90 underline decoration-white/40">instantly</span>. It's fast, easy, secured, &amp; trusted by millions.
            </p>
          </div>
          <div className="mt-8 flex flex-1 items-end justify-center">
            <img src={heroImg} alt="Graduate using INDDIA ERP" width={520} height={520} className="max-h-[480px] w-auto object-contain drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, children, trailing }: { icon: string; children: React.ReactNode; trailing?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-border pb-1 focus-within:border-primary">
      <span className="text-muted-foreground">{icon}</span>
      <div className="flex-1">{children}</div>
      {trailing}
    </div>
  );
}
