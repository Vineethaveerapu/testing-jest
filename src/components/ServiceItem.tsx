import type { ServiceItemProps } from '@/types';

const ServiceItem = (props: ServiceItemProps) => {
  const { id, title, description, isSelectedList, handleClickService } = props;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
        <button
          onClick={() => handleClickService({ title, description, id })}
          className={`ml-4 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
            isSelectedList
              ? 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200'
          }`}>
          {isSelectedList ? 'Remove' : 'Select'}
        </button>
      </div>
    </div>
  );
};

export default ServiceItem;
