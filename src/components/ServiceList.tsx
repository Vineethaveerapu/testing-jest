import ServiceItem from './ServiceItem';
import { type Service } from '@/app/page';

interface ServiceListProps {
  className?: string;
  items: Service[];
  addSelectedService?: (service: Service) => void;
  removeSelectedService?: (service: Service) => void;
  isSelectedList?: boolean;
}

const ServiceList = (props: ServiceListProps) => {
  const {
    className = '',
    items,
    addSelectedService,
    removeSelectedService,
    isSelectedList = false,
  } = props;

  const handleClickService = (service: Service) => {
    if (isSelectedList) {
      removeSelectedService?.(service);
    } else {
      addSelectedService?.(service);
    }
  };

  return (
    <div className={className}>
      {items.map((item) => (
        <ServiceItem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          isSelectedList={isSelectedList}
          handleClickService={handleClickService}
        />
      ))}
    </div>
  );
};

export default ServiceList;
