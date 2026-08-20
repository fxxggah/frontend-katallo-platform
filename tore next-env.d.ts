warning: in the working copy of 'app/globals.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'next-env.d.ts', LF will be replaced by CRLF the next time Git touches it
[1mdiff--git a / app / globals.css b / app / globals.css[m
[1mindex 9fd949b..d2ac78d 100644[m
[1m-- - a / app / globals.css[m
[1m++ + b / app / globals.css[m
[36m@@ - 3, 6 + 3, 10 @@[m
 [m
 @custom - variant dark(&: is(.dark *));[m
 [m
[32m +[m[32mhtml {[m
[32m +[m[32m  scroll- behavior: smooth;[m
[32m +[m[32m}[m
[32m +[m
 : root {[m
   --background: oklch(0.985 0.002 75);[m
   --foreground: oklch(0.13 0.02 75);[m
[1mdiff--git a/ next - env.d.ts b / next - env.d.ts[m
[1mindex c4b7818..9edff1c 100644[m
[1m-- - a / next - env.d.ts[m
[1m++ + b / next - env.d.ts[m
[36m@@ - 1, 6 + 1, 6 @@[m
 /// <reference types="next" />[m
 /// <reference types="next/image-types/global" />[m
[31m -import "./.next/dev/types/routes.d.ts";[m
[32m +[m[32mimport "./.next/types/routes.d.ts";[m
 [m
 // NOTE: This file should not be edited[m
 // see https://nextjs.org/docs/app/api-reference/config/typescript for more information.[m
[1mdiff--git a / templates / gbgames / components / GbGamesHero.tsx b / templates / gbgames / components / GbGamesHero.tsx[m
[1mindex 6aa216e..6cb980f 100644[m
[1m-- - a / templates / gbgames / components / GbGamesHero.tsx[m
[1m++ + b / templates / gbgames / components / GbGamesHero.tsx[m
[36m@@ - 44, 9 + 44, 11 @@[m [mexport function GbGamesHero() {[m
                < span className = "absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A855F7] opacity-75" />[m
                  < span className = "relative inline-flex h-2 w-2 rounded-full bg-[#A855F7]" />[m
                    </div>[m
[32m +[m
                    < span className = "text-[9px] font-black uppercase tracking-[0.4em] text-[#C084FC]" >[m
             Sua nova loja gamer de Botucatu[m
                      </span>[m
[32m +[m
           {/* Right accent */ }[m
                        < div className = "h-px w-6 bg-gradient-to-r from-[#7B2CFF]/60 to-transparent" />[m
                          </div>[m
[36m@@ - 56, 17 + 58, 23 @@[m [mexport function GbGamesHero() {[m
           className = "mt-10 text-6xl font-black leading-[0.9] tracking-tight text-white sm:text-8xl md:text-[106px]"[m
           style = {{ fontFamily: "'Syne', 'Georgia', serif" }}[m
                            >[m
[31m - <span className="block text-white/90" > Performance </span>[m
[32m +[m[32m < span className = "block text-white/90" >[m
[32m +[m[32m            Performance[m
[32m +[m[32m </span>[m
[32m +[m
                                      < span className = "block" >[m
             gamer[m
[32m +[m
                                          < span[m
[31m - className="relative inline-block ml-4 bg-gradient-to-br from-[#E2C4FF] via-[#A855F7] to-[#5A00B1] bg-clip-text text-transparent"[m
[32m +[m[32m              className = "relative ml-4 inline-block bg-gradient-to-br from-[#E2C4FF] via-[#A855F7] to-[#5A00B1] bg-clip-text text-transparent"[m
                                              >[m
               { " "}começa[m
[32m +[m
               {/* Underline accent */ }[m
[31m - <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-[#7B2CFF] via-[#A855F7] to-transparent rounded-full" />[m
[32m +[m[32m < span className = "absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-[#7B2CFF] via-[#A855F7] to-transparent" />[m
                                                        </span>[m
                                                        </span>[m
[32m +[m
                                                        < span className = "block bg-gradient-to-r from-[#F5C542] via-[#FFDD88] to-[#F5C542] bg-clip-text text-transparent" >[m
             aqui.[m
                                                          </span>[m
[36m@@ - 79, 6 + 87, 7 @@[m [mexport function GbGamesHero() {[m
                                                          < div className = "h-[1px] w-6 bg-[#7B2CFF]/30" />[m
                                                            </div>[m
 [m
[32m +[m[32m        {/* Description */ }[m
                                                              < p[m
           className = "mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"[m
           style = {{ fontFamily: "'DM Sans', 'sans-serif'" }}[m
[36m@@ - 87, 18 + 96, 36 @@[m [mexport function GbGamesHero() {[m
           moderna, tecnológica e premium.Eleve seu setup ao próximo nível.[m
                                                                </p>[m
 [m
[32m +[m[32m        {/* CTAs */ }[m
                                                                  < div className = "mt-10 flex flex-wrap gap-4" >[m
[31m - <button className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#4A0099] to-[#7B2CFF] px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(123,44,255,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(123,44,255,0.7)]" >[m
[31m - <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />[m
[31m - <span className="relative z-10" > Explorar Produtos </span>[m
[31m - </button>[m
 [m
[31m - <button className="group relative overflow-hidden rounded-xl border border-[#7B2CFF]/30 bg-transparent px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#A855F7]/60 hover:bg-[#7B2CFF]/8 hover:shadow-[0_0_30px_rgba(123,44,255,0.2)]" >[m
[32m +[m[32m          {/* Explorar Produtos */ }[m
[32m +[m[32m < a[m
[32m +[m[32m            href = "#produtos"[m
[32m +[m[32m            className = "group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#4A0099] to-[#7B2CFF] px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(123,44,255,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(123,44,255,0.7)]"[m
[32m +[m[32m >[m
[32m +[m[32m < div className = "absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />[m
[32m +[m
[32m +[m[32m < span className = "relative z-10" >[m
[32m +[m[32m              Explorar Produtos[m
[32m +[m[32m </span>[m
[32m +[m[32m </a>[m
[32m +[m
[32m +[m[32m          {/* Ver Categorias */ }[m
[32m +[m[32m < a[m
[32m +[m[32m            href = "#categorias"[m
[32m +[m[32m            className = "group relative overflow-hidden rounded-xl border border-[#7B2CFF]/30 bg-transparent px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-[#A855F7]/60 hover:bg-[#7B2CFF]/8 hover:shadow-[0_0_30px_rgba(123,44,255,0.2)]"[m
[32m +[m[32m >[m
             {/* Corner accents */ }[m
                                                                                                                  < div className = "absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#7B2CFF]/60" />[m
[31m - <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-[#7B2CFF]/60" />[m
[31m - <span className="relative z-10" > Ver Categorias </span>[m
[31m - </button>[m
[32m +[m
[32m +[m[32m < div className = "absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#7B2CFF]/60" />[m
[32m +[m
[32m +[m[32m < span className = "relative z-10" >[m
[32m +[m[32m              Ver Categorias[m
[32m +[m[32m </span>[m
[32m +[m[32m </a>[m
[32m +[m
                                                                                                                                        </div>[m
                                                                                                                                        </div>[m
 [m
[36m@@ - 109, 6 + 136, 7 @@[m [mexport function GbGamesHero() {[m
                                                                                                                                          < div className = "absolute bottom-0 left-0 right-0 flex items-center justify-center" >[m
                                                                                                                                            < div className = "h-[1px] w-full max-w-5xl bg-gradient-to-r from-transparent via-[#7B2CFF]/30 to-transparent" />[m
                                                                                                                                              </div>[m
[32m +[m
                                                                                                                                              </section>[m
   );[m
 }[m
                                                                                                                                            \ No newline at end of file[m
[1mdiff--git a / templates / gbgames / pages / GbGamesCategoryTemplate.tsx b / templates / gbgames / pages / GbGamesCategoryTemplate.tsx[m
[1mindex ea21642..99d231b 100644[m
[1m-- - a / templates / gbgames / pages / GbGamesCategoryTemplate.tsx[m
[1m++ + b / templates / gbgames / pages / GbGamesCategoryTemplate.tsx[m
[36m@@ - 14, 7 + 14, 10 @@[m [mtype GbGamesCategoryTemplateProps = {[m
 [m
 export function GbGamesCategoryTemplate({ store, category, productsPage }: GbGamesCategoryTemplateProps) {[m
   return([m
[31m- <div className="relative min-h-screen bg-[#06040F] text-white" >[m
[32m +[m[32m < div[m
[32m +[m[32m      id = "categorias"[m
[32m +[m[32m      className = "relative min-h-screen bg-[#06040F] text-white"[m
[32m +[m[32m >[m
                                                                                                                                                                  < GbGamesParticles />[m
                                                                                                                                                                    < GbGamesNavbar store = { store } />[m
 [m
[1mdiff--git a / templates / gbgames / pages / GbGamesHomeTemplate.tsx b / templates / gbgames / pages / GbGamesHomeTemplate.tsx[m
[1mindex bb56216..3466449 100644[m
[1m-- - a / templates / gbgames / pages / GbGamesHomeTemplate.tsx[m
[1m++ + b / templates / gbgames / pages / GbGamesHomeTemplate.tsx[m
[36m@@ - 109, 7 + 109, 7 @@[m [mexport function GbGamesHomeTemplate({ store, categories, productsPage }: GbGames[m
 [m
         {/* ── Categories ── */ }[m
         { categories.length > 0 && ([m
[31m - <section id="categorias" className = "mx-auto max-w-7xl px-6 py-20" >[m
[32m +[m[32m < section className = "mx-auto max-w-7xl px-6 py-20" >[m
                                                                                                                                                                                      < SectionHeader[m
               eyebrow = "Explore"[m
               title = "Categorias"[m
[36m@@ - 188, 7 + 188, 7 @@[m [mexport function GbGamesHomeTemplate({ store, categories, productsPage }: GbGames[m
 [m
         {/* ── All products ── */ }[m
         { availableProducts.length > 0 && ([m
[31m - <section id="produtos" className = "mx-auto max-w-7xl px-6 py-20" >[m
[32m +[m[32m < section className = "mx-auto max-w-7xl px-6 py-20" >[m
                                                                                                                                                                                                  < SectionHeader[m
               eyebrow = "Estoque"[m
               title = "Produtos disponíveis"[m
[1mdiff--git a / templates / gbgames / pages / GbGamesProductTemplate.tsx b / templates / gbgames / pages / GbGamesProductTemplate.tsx[m
[1mindex 588dee2..f184e04 100644[m
[1m-- - a / templates / gbgames / pages / GbGamesProductTemplate.tsx[m
[1m++ + b / templates / gbgames / pages / GbGamesProductTemplate.tsx[m
[36m@@ - 62, 7 + 62, 10 @@[m [mexport function GbGamesProductTemplate({ store, product, relatedProducts = [] }:[m
     : 0;[m
 [m
   return ([m
[31m - <div className="relative min-h-screen bg-[#06040F] text-white" >[m
[32m +[m[32m < div[m
[32m +[m[32m      id = "produtos"[m
[32m +[m[32m      className = "relative min-h-screen bg-[#06040F] text-white"[m
[32m +[m[32m >[m
                                                                          < GbGamesParticles />[m
                                                                            < GbGamesNavbar store = { store } />[m
 [m
[36m@@ - 109, 11 + 112, 10 @@[m [mexport function GbGamesProductTemplate({ store, product, relatedProducts = [] }:[m
                   <button[m
                     key = { image.id }[m
                     onClick = {() => setSelectedImageIndex(index)}[m
[31m - className={`relative overflow-hidden flex-shrink-0 rounded-xl border-2 transition-all duration-300 ${[m
[31m - selectedImageIndex === index[m
[32m +[m[32m                    className = {`relative overflow-hidden flex-shrink-0 rounded-xl border-2 transition-all duration-300 ${selectedImageIndex === index[m
                                                                      ? "border-[#7B2CFF] shadow-[0_0_20px_rgba(123,44,255,0.5)]"[m
                         : "border-white/8 hover:border-[#7B2CFF]/40"[m
[31m -                    }`}[m
[32m+[m[32m                      }`}[m
                  >[m
                    < img[m
                       src = { image.imageUrl }[m
[36m@@ - 213, 11 + 215, 10 @@[m [mexport function GbGamesProductTemplate({ store, product, relatedProducts = [] }:[m
             ): ([m
                          < button[m
                 onClick = { openConfirmation }[m
[31m - className={`group relative mt-8 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 ${[m
[31m - isInCart[m
[32m +[m[32m                className = {`group relative mt-8 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-0.5 ${isInCart[m
                                  ? "bg-gradient-to-r from-red-700 to-rose-600 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_45px_rgba(239,68,68,0.45)]"[m
                     : "bg-gradient-to-br from-[#4A0099] to-[#7B2CFF] shadow-[0_0_40px_rgba(123,44,255,0.4)] hover:shadow-[0_0_60px_rgba(123,44,255,0.6)]"[m
[31m -                }`}[m
[32m+[m[32m                  }`}[m
                                        >[m
                 {/* Shimmer */ }[m
                                          < div className = "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />[m
