import { Card, CardHeader } from '@/components/ui/card';

export const OffersSection = () => {
  return (
    <Card className="rounded-none">
      <CardHeader className="bg-orange-50 py-3">
        <div className="flex items-center space-x-5">
          <div className="w-7 h-7 bg-orange-600 text-white rounded-sm flex items-center justify-center">
            3
          </div>
          <h2 className="text-base font-normal text-orange-600">
            CHECK OFFERS
          </h2>
        </div>
      </CardHeader>
    </Card>
  );
};
