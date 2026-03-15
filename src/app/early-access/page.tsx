"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function EarlyAccessPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [agency, setAgency] = useState("");
  const [notes, setNotes] = useState("");

  const canSubmit = useMemo(() => email.trim().length > 3 && email.includes("@"), [email]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name, agency, notes }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error ?? "Request failed");
      }

      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-xl px-6 py-16">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="font-semibold">
            ← Back
          </Link>
          <Badge variant="secondary">Limited beta</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request early access</CardTitle>
            <CardDescription>We’ll email you when we open beta spots.</CardDescription>
          </CardHeader>
          <CardContent>
            {done ? (
              <div className="grid gap-2">
                <div className="text-lg font-semibold">You’re on the list.</div>
                <div className="text-sm text-muted-foreground">We’ll reach out soon.</div>
                <div className="pt-4">
                  <Link href="/">
                    <Button variant="outline">Back to homepage</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@agency.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name (optional)</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Thorstein" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="agency">Agency (optional)</Label>
                    <Input
                      id="agency"
                      value={agency}
                      onChange={(e) => setAgency(e.target.value)}
                      placeholder="Nordby Growth"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What are you trying to promote?"
                  />
                </div>

                {error ? <div className="text-sm text-red-500">{error}</div> : null}

                <Button type="submit" disabled={loading || !canSubmit}>
                  {loading ? "Submitting…" : "Request early access"}
                </Button>

                <p className="text-xs text-muted-foreground">No spam. Just beta updates.</p>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
