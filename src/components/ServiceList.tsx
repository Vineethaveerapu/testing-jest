import ServiceItem from './ServiceItem';
import type { ServiceListProps, Service } from '@/types';

const ServiceList = ({
  className = '',
  items,
  addSelectedService,
  removeSelectedService,
  isSelectedList = false,
}: ServiceListProps) => {
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
