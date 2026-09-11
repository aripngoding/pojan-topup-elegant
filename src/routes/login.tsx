import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { login } from "@/lib/server-fns";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Masuk — Pojan Topup" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Username dan password wajib diisi");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await login({ data: { username: username.trim(), password } });
      navigate({ to: "/" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />
      <main className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
        <div className="w-full rounded-3xl border border-border bg-card p-8 shadow-card">
          {/* Logo */}
          <div className="mb-6 flex flex-col items-center gap-2">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-accent font-display text-2xl font-bold text-accent-foreground">
              P
            </span>
            <h1 className="font-display text-xl font-bold text-foreground">Masuk ke Pojan Topup</h1>
            <p className="text-sm text-muted-foreground">Selamat datang kembali!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              label="Username"
              type="text"
              value={username}
              onChange={setUsername}
              placeholder="Masukkan username"
              autoComplete="username"
            />

            <div className="block">
              <span className="text-xs font-medium text-muted-foreground">Password</span>
              <div className="relative mt-1.5">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 pr-11 text-sm text-foreground outline-none transition focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error ? (
              <p className="rounded-xl bg-destructive/10 px-4 py-2.5 text-xs font-medium text-destructive">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-105 disabled:opacity-60"
            >
              <LogIn className="size-4" />
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary"
      />
    </label>
  );
}
