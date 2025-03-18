import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import { Url } from "next/dist/shared/lib/router/router";
import ContactCircle from "@/components/animated/contact-circle";

const aboutStats = [
  { label: "Anos de experiência", value: "4+" },
  { label: "Tecnologias dominadas", value: "10+" },
  { label: "Produtos desenvolvidos", value: "5+" },
];

const projects = [
  {
    title: "MContabilidade",
    description: "Seu melhor escritório de contabilidade!",
    image: "https://i.ibb.co/CpbYL0L6/Screenshot-2025-02-09-at-15-40-35.png",
    href: "https://martinssolucoesweb.site/mcontabilidade",
  },
  {
    title: "MPro",
    description: "Aumente suas vendas e potencialize seu negócio!",
    image: "https://i.ibb.co/397WWGkW/Captura-de-tela-2025-03-17-204547.png",
    href: "https://martinssolucoesweb.site/mcpro/",
  },
  {
    title: "DataMind IA",
    description: "Transformando dados em decisões inteligentes com IA!",
    image: "https://i.ibb.co/mCm4mwbW/Captura-de-tela-2025-03-17-204916.png",
    href: "https://martinssolucoesweb.site/datamindia/",
  },
  {
    title: "MedLAR - Medicina e Cuidados Domiciliares",
    description: "O Home Care que você merece Com o cuidado que você precisa",
    image: "https://i.ibb.co/fd4m1SGk/Screenshot-2025-02-23-at-18-40-49.png",
    href: "https://martinssolucoesweb.site/medlar",
  },
  {
    title: "Andrade & Tavares Advocacia",
    description: "Soluções jurídicas eficazes para a proteção e crescimento do seu negócio.",
    image: "https://i.ibb.co/9k1gR9Q6/Screenshot-2025-02-12-at-19-22-54.png",
    href: "https://martinssolucoesweb.site/andradeetavaresadvocacia/",
  },
  {
    title: "Condomínio Villa Di Parma II",
    description: "Transparência, comodidade e segurança!",
    image: "https://i.ibb.co/vChWS1LP/Screenshot-2025-02-09-at-15-41-23.png",
    href: "https://martinssolucoesweb.site/villadiparmaii/",
  },
  {
    title: "Curso de CupCakes da Mari",
    description: "Aprenda a se destacar da concorrência criando CupCakes confeitados incríveis para suas clientes.",
    image: "https://i.ibb.co/kV6cFMNv/Screenshot-2025-02-09-at-15-42-30.png",
    href: "https://martinssolucoesweb.site/cupcakesdamari",
  }
];

const services = [
  {
    service: "Desenvolvimento Frontend",
    description:
      "Criando interfaces de usuário e experiências web excepcionais usando as tecnologias mais recentes.",
    icon: Code2,
  },
  {
    service: "Design de UX",
    description:
      "Crie designs intuitivos e centrados no usuário que impulsionem o engajamento e a conversão.",
    icon: Frame,
  },
  {
    service: "Design responsivo",
    description:
      "Projetando sites que tenham a mesma aparência e desempenho em todos os dispositivos e tamanhos de tela.",
    icon: MonitorSmartphone,
  },
  {
    service: "Desenvolvimento Backend",
    description:
      "Desenvolvendo lógica robusta e escalável do lado do servidor para uma ampla gama de aplicativos da web.",
    icon: Eye,
  },
  {
    service: "Automação de atendimento via WhatsApp",
    description:
      "Automatizando interações no WhatsApp com bots inteligentes, proporcionando suporte ágil, personalizado e disponível em 100% do tempo.",
    icon: Eye,
  }
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const wppContact = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT;

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          // console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 h-[100vh] justify-center sm:h-auto flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row sm:justify-evenly"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row w-[520px] items-start space-x-1.5"
            >
              <span className={styles.pill}>Todos os tipos de sites</span>
              <span className={styles.pill}>Apps</span>
              <span className={styles.pill}>Automações</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Martins 
                  <br />
                  Soluções
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                 {' Web'}
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                Criação de sites, aplicativos e automação de atendimento via WhatsApp para impulsionar o seu negócio.
              </p>
              {/* <ContactCircle/> */}
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href={wppContact as Url} passHref>
                <Button variant="basicGrowth">
                  Entre em contato <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Saber mais
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll para descobrir{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section  className="h-[100vh]">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mt-40 h-full sm:my-64 flex max-w-6xl flex-col justify-start sm:space-y-10 xl:space-y-0 xl:my-0"
          >
            <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
            Com 4 anos de experiência no mercado, a Martins Soluções Web é especialista em transformar negócios com sites de alta conversão, aplicativos personalizados e automação inteligente via WhatsApp. Nosso foco é entender suas necessidades, adaptar cada projeto ao seu orçamento e entregar soluções que impulsionam sua presença online de forma estratégica e eficiente.
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section className="h-[100vh]">
          {/* Gradient */}
          <div data-scroll data-scroll-speed=".4" className="mt-24 h-full">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projetos
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Experiências digitais simplificadas.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Trabalhamos em uma variedade de projetos, de pequenos sites a aplicativos da web de grande escala. Aqui estão alguns dos nossos favoritos:
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card id="tilt">
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank" passHref>
                            {project.image.endsWith(".webm") ? (
                              <video
                                src={project.image}
                                autoPlay
                                loop
                                muted
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                quality={100}
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            )}
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section className="h-[100vh]">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mt-24 sm:mb-0 flex h-full flex-col justify-start space-y-10 lg:my-0"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                Precisa de mais informações?
                  <br />
                  <span className="text-white clash-grotesk tracking-normal">
                  <span className="text-gradient">Ajudamos você!</span>
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                Aqui estão alguns dos serviços que oferecemos. Se você tiver alguma dúvida, sinta-se à vontade para entrar em contato.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-blue-500" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="h-[60vh] mt-[800px] sm:mt-[0px]">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
            Vamos trabalhar{" "}
              <span className="text-gradient clash-grotesk">juntos.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
            No momento, estamos disponíveis para desenvolver projetos e entregar soluções sob medida para as suas necessidades.
            </p>
            <Link href={wppContact as Url} passHref>
              <Button variant="basicGrowth" className="mt-6">Entre em contato</Button>
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
