'use client';
import ServiceList from '@/components/ServiceList';
import { useState } from 'react';
import type { Service } from '@/types';
import { ourServices } from '@/data';

const Page = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const addSelectedService = (service: Service) => {
    setSelectedServices([...selectedServices, service]);
  };

  const removeSelectedService = (service: Service) => {
    setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
  };

  return (
    <div>
      <h1>Nurturing Gardens, Changing Lives</h1>
      <p>
        Gardening is a rewarding hobby that allows you to cultivate beauty and
        tranquility. Whether you plant flowers, herbs, or vegetables, each
        garden reflects your personality.
      </p>

      <div className="flex gap-4 flex-wrap">
        <div>
          <h2>Our Services</h2>
          <p>You can select a service from the list below.</p>
          <ServiceList
            items={ourServices}
            addSelectedService={addSelectedService}
            isSelectedList={false}
          />
        </div>
        <div>
          <h2>Selected Service</h2>
          <p>You can selected services.</p>
          <ServiceList
            items={selectedServices}
            removeSelectedService={removeSelectedService}
            isSelectedList={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
