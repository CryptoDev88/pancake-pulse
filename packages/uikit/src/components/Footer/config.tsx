import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import {
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
  InstagramIcon,
  GithubIcon,
  DiscordIcon,
  MediumIcon,
  RocketIcon,
  ChartIcon,
} from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.dextop.pro/contact-us",
      },
      {
        label: "Blog",
        href: "https://medium.com/pancakeswap",
      },
      {
        label: "Community",
        href: "https://docs.dextop.pro/contact-us/telegram",
      },
      {
        label: "DEX",
        href: "https://docs.dextop.pro/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.dextop.pro/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.dextop.pro/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.dextop.pro/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.dextop.pro",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.dextop.pro/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.dextop.pro/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/dextoppro",
  },
  // {
  //   label: "Discord",
  //   icon: DiscordIcon,
  //   href: "#",
  // },
  {
    label: "GitHub",
    icon: GithubIcon,
    href: "https://github.com/GoDexTop",
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/goDexTop",
  },
  {
    label: "Rocket",
    icon: ChartIcon,
    href: "https://dexscreener.com/pulsechain/f:0x556F4C3aAa6c6b76e1BBa0409D99D4a483b29997",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
