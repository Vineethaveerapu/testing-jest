import { type Service } from '@/app/page';

export interface ServiceItemProps {
  id: number;
  title: string;
  description: string;
  isSelectedList: boolean;
  handleClickService: (service: Service) => void;
}

const ServiceItem = (props: ServiceItemProps) => {
  const { id, title, description, isSelectedList, handleClickService } = props;
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
