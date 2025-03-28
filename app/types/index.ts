export interface FeatureProps {
  icon: any;
  title: string;
  text: string;
}

export interface Director {
  year: string;
  title: string;
  description: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface PageProps {
  children: React.ReactNode;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ElementType;
}
