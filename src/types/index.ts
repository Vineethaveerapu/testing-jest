export interface Service {
  id: number;
  title: string;
  description: string;
}

export interface PageLink {
  name: string;
  href: string;
}

export interface BaseComponentProps {
  className?: string;
}

export interface ServiceItemProps extends BaseComponentProps {
  id: number;
  title: string;
  description: string;
  isSelectedList: boolean;
  handleClickService: (service: Service) => void;
}

export interface ServiceListProps extends BaseComponentProps {
  items: Service[];
  addSelectedService?: (service: Service) => void;
  removeSelectedService?: (service: Service) => void;
  isSelectedList?: boolean;
}

export interface MediaCardProps extends BaseComponentProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface TextCardProps extends BaseComponentProps {
  title?: string | null;
  children?: React.ReactNode | null;
}
