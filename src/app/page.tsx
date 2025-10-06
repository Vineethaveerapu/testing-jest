'use client';
import ServiceList from '@/components/ServiceList';
import { useState } from 'react';
import type { Service } from '@/types';
import { ourServices } from '@/data';

const Page = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const addSelectedService = (service: Service) => {
    // Prevent duplicate selections
    if (!selectedServices.find((s) => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeSelectedService = (service: Service) => {
    setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-16 py-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Professional Garden Services
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Transform your outdoor space with our comprehensive garden maintenance
          services. Our expert team provides professional care to nurture your
          gardens and enhance your property&apos;s natural beauty.
        </p>
      </section>

      {/* Services Section */}
      <section className="mb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Available Services */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Choose Services
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Click on any service below to add it to your selection.
            </p>
            <ServiceList
              items={ourServices}
              addSelectedService={addSelectedService}
              isSelectedList={false}
              className="space-y-4"
            />
          </div>

          {/* Selected Services */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">
                Your Selection
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              Choose services from the left panel to get started
            </p>
            <div className="space-y-4">
              <ServiceList
                items={selectedServices}
                removeSelectedService={removeSelectedService}
                isSelectedList={true}
                className="space-y-4"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
