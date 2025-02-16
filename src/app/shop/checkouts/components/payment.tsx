import { Card, CardHeader } from '@/components/ui/card';

export const PaymentSection = () => {
  return (
    <Card className="rounded-none">
      <CardHeader className="bg-orange-50 py-3">
        <div className="flex items-center space-x-5">
          <div className="w-7 h-7 bg-orange-600 text-white rounded-sm flex items-center justify-center">
            4
          </div>
          <h2 className="text-base font-normal text-orange-600">
            PAYMENT OPTIONS
          </h2>
        </div>
      </CardHeader>
    </Card>
  );
};

// <div className="space-y-4">
//   <h2 className="text-2xl font-semibold">Payment</h2>
//   <p className="text-sm text-gray-600">
//     All transactions are secure and encrypted.
//   </p>

//   <Card>
//     <CardHeader>
//       <CardTitle className="flex items-center">
//         <CreditCard className="h-5 w-5 mr-2" />
//         Credit card
//       </CardTitle>
//     </CardHeader>
//     <CardContent className="space-y-4">
//       <Input placeholder="Card number" type="text" />
//       <div className="grid grid-cols-2 gap-4">
//         <Input placeholder="Expiration date (MM/YY)" />
//         <div className="relative">
//           <Input placeholder="Security code" />
//           <HelpCircle className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
//         </div>
//       </div>
//       <Input placeholder="Name on card" />
//       <div className="flex items-center space-x-2">
//         <Checkbox
//           id="useShipping"
//           checked={useShippingAsBilling}
//           onCheckedChange={checked =>
//             setUseShippingAsBilling(checked as boolean)
//           }
//         />
//         <Label htmlFor="useShipping">
//           Use shipping address as billing address
//         </Label>
//       </div>
//     </CardContent>
//     <CardFooter>
//       <Button className="w-full bg-blue-600 hover:bg-blue-700">Pay now</Button>
//     </CardFooter>
//   </Card>
// </div>;
