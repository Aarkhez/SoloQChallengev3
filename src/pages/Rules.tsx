import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, Trophy, Calendar, Coins } from 'lucide-react';

const Rules = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-32 px-6">
      <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-8 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Retour à l&apos;accueil
          </Link>

          {/* En-tête */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Règles du SoloQ Challenge
              </h1>
              <p className="text-muted-foreground mt-1">
                Tout ce qu&apos;il faut savoir
              </p>
            </div>
          </div>

        {/* Section Présentation */}
        <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-primary" />
              Comment ça marche
            </h2>
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <p className="text-foreground/90 mb-4 leading-relaxed">
                Le SoloQ Challenge est une compétition amicale entre joueurs de League of Legends. Chaque joueur tente de grimper le plus haut possible en classement solo.
              </p>
              <p className="text-foreground/90 mb-4 leading-relaxed">
                Les scores sont ajustés selon un <strong className="text-foreground">coefficient personnalisé</strong> pour chaque joueur, afin d&apos;équilibrer les différences de niveau initial.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Les joueurs sont répartis en <strong className="text-foreground">deux équipes de 6 joueurs</strong>. En plus du classement individuel, un <strong className="text-foreground">classement par équipe</strong> est disponible : il est déterminé par la somme des LP ajustés des joueurs de chaque équipe.
              </p>
            </div>
          </section>
           {/* Section Tri */}
           <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-primary" />
              Tri du classement
            </h2>
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <p className="text-foreground/90 mb-4 leading-relaxed">
                Vous pouvez trier le classement de deux façons :
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center mt-0.5">1</span>
                  <span className="text-foreground/90"><strong className="text-foreground">Par classement</strong> : LP bruts (non ajustés), basés sur le rang et les LP des joueurs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center mt-0.5">2</span>
                  <span className="text-foreground/90"><strong className="text-foreground">Par LP ajustés</strong> : LP multipliés par le coefficient de chaque joueur.</span>
                </li>
              </ul>
            </div>
          </section>

           {/* Section Format */}
           <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Format du challenge
            </h2>
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <p className="text-foreground/90 mb-4 leading-relaxed">
                Le challenge se déroule sur <strong className="text-foreground">4 semaines</strong> avec un plafond de parties par semaine :
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                <li className="flex items-center gap-2 text-foreground/90 py-2 px-3 rounded-lg bg-muted/70 border border-border/60">
                  <strong className="text-primary w-20 shrink-0">Semaine 1</strong> 25 parties max
                </li>
                <li className="flex items-center gap-2 text-foreground/90 py-2 px-3 rounded-lg bg-muted/70 border border-border/60">
                  <strong className="text-primary w-20 shrink-0">Semaine 2</strong> 30 parties max
                </li>
                <li className="flex items-center gap-2 text-foreground/90 py-2 px-3 rounded-lg bg-muted/70 border border-border/60">
                  <strong className="text-primary w-20 shrink-0">Semaine 3</strong> 35 parties max
                </li>
                <li className="flex items-center gap-2 text-foreground/90 py-2 px-3 rounded-lg bg-muted/70 border border-border/60">
                  <strong className="text-primary w-20 shrink-0">Semaine 4</strong> 35 parties max
                </li>
              </ul>
              <div className="flex items-center gap-3 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 mb-4">
                <Trophy className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground text-sm">
                  <strong>Dernières 24h :</strong> parties <strong>illimitées</strong>
                </span>
              </div>

              <p className="text-muted-foreground text-sm">
                Le nombre de parties restantes ou manquantes est affiché dans le classement pour chaque joueur.
              </p>
            </div>
          </section>

          {/* Section Cash Prize */}
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              Cash Prize
            </h2>
            <div className="rounded-xl border p-6 shadow-sm bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-100/80 dark:from-amber-950/35 dark:to-orange-950/25 dark:border-amber-800/40">
              <p className="text-foreground/90 mb-4 leading-relaxed">
                Les récompenses sont réparties entre le classement individuel et le classement par équipe.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground">
                  <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span><strong>Équipe gagnante</strong> : 60€ (répartis entre les 6 joueurs)</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span><strong>1er du classement</strong> : 30€</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span><strong>2e du classement</strong> : 20€</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <span><strong>3e du classement</strong> : 10€</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rules;
