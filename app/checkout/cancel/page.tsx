'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function CheckoutCancel() {
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold">Checkout Cancelled</h1>
      <p className="text-gray-600">Your order has been cancelled. No charges were made.</p>
      <p className="text-gray-600">You can return to your cart to try again or continue shopping.</p>
      <div className="flex gap-4">
        <Button
          onClick={() => router.push('/cart')}
          variant="outline"
        >
          Return to Cart
        </Button>
        <Button
          onClick={() => router.push('/')}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
} 