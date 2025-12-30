type FooterConfigItem = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

type FooterProps = {
  footerConfig: FooterConfigItem[];
};
export type { FooterProps };
