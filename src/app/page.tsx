'use client';
import ServiceList from '@/components/ServiceList';
import { useState } from 'react';

export interface Service {
  id: number;
  title: string;
  description: string;
}

export const ourServices: Service[] = [
  {
    id: 1,
    title: 'Weeding',
    description:
      'Weeding is the process of removing unwanted plants from a garden or lawn. It is a necessary part of maintaining a healthy garden and lawn.',
  },
  {
    id: 2,
    title: 'Watering',
    description:
      'Watering is the process of adding water to a garden or lawn. It is a necessary part of maintaining a healthy garden and lawn.',
  },
  {
    id: 3,
    title: 'Pruning and Trimming',
    description:
      'Pruning and trimming is the process of cutting back plants to maintain a healthy garden and lawn.',
  },
];

export default function Page() {
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
}
