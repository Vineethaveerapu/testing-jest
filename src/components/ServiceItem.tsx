import type { ServiceItemProps } from '@/types';

const ServiceItem = ({
  id,
  title,
  description,
  isSelectedList,
  handleClickService,
}: ServiceItemProps) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>{description}</p>
      <button
        onClick={() => handleClickService({ title, description, id })}
        className={`${isSelectedList ? 'bg-red-500' : 'bg-green-500'}`}>
        {isSelectedList ? 'Remove' : 'Select'}
      </button>
    </div>
  );
};

export default ServiceItem;
