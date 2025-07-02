import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("About"),
    items: [
      {
        label: t("Contact"),
        href: "https://www.homelessexchange.com/",
   
      },
      {
        label: t("audit"),
        href: "https://drive.google.com/file/d/1CMmBkVVLX72DDJkogTf7esC80yrvbBqn/view?usp=drive_link",
   
      },
     
      {
        label: t("Litepaper"),
        href: "https://www.homelessexchange.com/p/whitepaper.html",
      }
     
    ],
  },
  
  
];
