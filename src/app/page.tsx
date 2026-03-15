import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-foreground" />
            <div className="font-semibold">PipelinePilot (working title)</div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">Early access</Badge>
            <a href="#early-access">
              <Button>Get early access</Button>
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge className="mb-4" variant="secondary">
              Built for HubSpot agencies
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              LinkedIn ads → HubSpot pipeline & revenue.
              <span className="text-muted-foreground"> Automated.</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Create B2B angles, generate on-brand ad creatives with real typography, and track the pipeline your paid
              social actually creates — without spreadsheets.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#early-access">
                <Button size="lg">Request early access</Button>
              </a>
              <a href="#how-it-works">
                <Button size="lg" variant="outline">
                  See how it works
                </Button>
              </a>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Limited beta: <span className="font-medium text-foreground">50 spots</span> for agencies & HubSpot
              partners.
            </p>
          </div>

          <Card className="border-muted">
            <CardHeader>
              <CardTitle>What you get</CardTitle>
              <CardDescription>Everything an in-house performance marketer does — minus the overhead.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <div className="font-medium">Angle library + agent</div>
                <div className="text-sm text-muted-foreground">
                  20–40 B2B angles per campaign (pain, ROI, proof, objections) — pick your favourites.
                </div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium">Template-based creatives</div>
                <div className="text-sm text-muted-foreground">
                  Generate images, then apply HTML typography overlays + brand kit for consistent, pro-looking ads.
                </div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium">HubSpot pipeline attribution</div>
                <div className="text-sm text-muted-foreground">
                  Track leads → SQL → pipeline → won revenue from LinkedIn, with clean UTMs.
                </div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium">Launch to LinkedIn (or export pack)</div>
                <div className="text-sm text-muted-foreground">
                  Publish directly where possible — otherwise export creatives + copy + UTMs ready to upload.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-14" />

        <section id="how-it-works" className="grid gap-6">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>1) Drop in what you’re promoting</CardTitle>
                <CardDescription>Webinar, landing page, content download — just paste a URL or describe it.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>2) Pick angles & creatives</CardTitle>
                <CardDescription>
                  Choose from proven B2B angles. We generate copy + on-brand creatives in multiple variants.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>3) Launch & measure in HubSpot</CardTitle>
                <CardDescription>
                  UTMs are enforced automatically so you can see pipeline created and revenue won from paid social.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <Separator className="my-14" />

        <section id="early-access" className="grid gap-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">Get early access</h2>
              <p className="mt-2 text-muted-foreground">
                Join the beta list. We’ll reach out when we open spots (aim: 50 agencies).
              </p>
            </div>
            <Badge variant="secondary">Limited: 50 spots</Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request an invite</CardTitle>
              <CardDescription>We’ll email you when the beta is ready.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action="/early-access" method="get" className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Click below to request access. Takes 20 seconds.
                </p>
                <Button type="submit">Open early access form</Button>
                <p className="text-xs text-muted-foreground">Limited beta. No spam.</p>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-2 text-sm text-muted-foreground">
            <p>
              Want to be one of the first? Reply to the invite email with “priority” and a 1-line description of your
              client niche.
            </p>
          </div>
        </section>

        <Separator className="my-14" />

        <footer className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} PipelinePilot (working title)</div>
          <div>Built for HubSpot agencies who want measurable pipeline from paid social.</div>
        </footer>
      </section>
    </main>
  );
}
