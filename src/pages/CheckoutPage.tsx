import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast as sonnerToast } from 'sonner';
import { ArrowLeft, Lock, ShoppingCart, CreditCard, Truck } from 'lucide-react';

// Define Zod schema for form validation
const checkoutFormSchema = z.object({
  // Shipping Information
  email: z.string().email({ message: "Invalid email address." }),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  apartment: z.string().optional(),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  country: z.string().min(2, { message: "Please select a country." }),
  postalCode: z.string().min(3, { message: "Postal code must be at least 3 characters." }),

  // Shipping Method
  shippingMethod: z.enum(['standard', 'express'], {
    required_error: "You need to select a shipping method.",
  }),

  // Payment Details
  cardName: z.string().min(2, { message: "Name on card is required." }),
  cardNumber: z.string()
    .min(13, { message: "Card number must be between 13 and 19 digits." })
    .max(19, { message: "Card number must be between 13 and 19 digits." })
    .regex(/^\d+$/, { message: "Card number must contain only digits." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be MM/YY format." }),
  cvv: z.string().min(3, { message: "CVV must be 3 or 4 digits." }).max(4, { message: "CVV must be 3 or 4 digits." }).regex(/^\d+$/, { message: "CVV must contain only digits." }),
  
  // Terms and Conditions
  agreeToTerms: z.boolean().refine(value => value === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Sample cart items for order summary
const sampleCartItems = [
  { id: '1', name: 'Lulu the Lamb - Forest Fairy Series', price: 59.99, quantity: 1, imageUrl: 'https://cdn.popmart.com/MUL/1000100000020230828152046.png?x-oss-process=image/format,webp/resize,m_pad,h_800,w_800,color_ffffff' },
  { id: '2', name: 'Zimomo "The Little Monster" Figure', price: 79.50, quantity: 1, imageUrl: 'https://cdn.popmart.com/MUL/1000100000020230523151522.png?x-oss-process=image/format,webp/resize,m_pad,h_800,w_800,color_ffffff' },
];

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      fullName: '',
      address: '',
      apartment: '',
      city: '',
      country: '',
      postalCode: '',
      shippingMethod: 'standard',
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log('Checkout form submitted:', data);
    // Simulate API call
    sonnerToast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
        loading: 'Processing your order...',
        success: () => {
            setOrderPlaced(true);
            return `Order placed successfully! Your order ID is LABUBU${Math.floor(Math.random() * 10000)}.`;
        },
        error: 'Failed to place order. Please try again.',
    });
  };

  const subtotal = sampleCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = form.watch('shippingMethod') === 'express' ? 15.00 : 5.00;
  const total = subtotal + shippingCost;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md text-center shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-pink-600">Thank You!</CardTitle>
            <CardDescription className="text-lg text-purple-700">Your Labubu order has been placed!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <img src="https://cdn.popmart.com/events/2023/09/ValentinesDaySeries/pc/2-1.gif" alt="Labubu Celebrating" className="mx-auto w-48 h-48 rounded-full"/>
            <p className="text-gray-700">A confirmation email has been sent to {form.getValues('email')}.</p>
            <p className="text-gray-600 text-sm">Your Order ID: LABUBU{Math.floor(Math.random() * 10000)}</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button onClick={() => navigate('/')} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={() => navigate('/product-listing')} className="w-full border-purple-500 text-purple-500 hover:bg-purple-50 hover:text-purple-600">
              View More Products
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
            Labubu<span className="text-purple-600">Store</span>
          </Link>
          <Button variant="ghost" asChild className="text-purple-600 hover:text-pink-600">
            <Link to="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-purple-700 mb-8 text-center">Checkout</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column: Shipping & Payment Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <Card className="shadow-lg border-purple-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700 flex items-center">
                    <Truck className="mr-3 h-6 w-6 text-pink-500"/>
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Labubu Lover" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Labubu Lane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apartment, suite, etc. (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Apt 4B" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Dollsville" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="GB">United Kingdom</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                              {/* Add more countries as needed */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="L4B UB0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card className="shadow-lg border-purple-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700">Shipping Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="shippingMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md hover:border-pink-400 transition-colors cursor-pointer has-[:checked]:bg-pink-50 has-[:checked]:border-pink-500">
                              <FormControl>
                                <RadioGroupItem value="standard" />
                              </FormControl>
                              <FormLabel className="font-normal flex-grow cursor-pointer">
                                Standard Shipping (5-7 business days)
                              </FormLabel>
                              <span className="text-sm font-medium text-gray-700">$5.00</span>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-md hover:border-pink-400 transition-colors cursor-pointer has-[:checked]:bg-pink-50 has-[:checked]:border-pink-500">
                              <FormControl>
                                <RadioGroupItem value="express" />
                              </FormControl>
                              <FormLabel className="font-normal flex-grow cursor-pointer">
                                Express Shipping (1-3 business days)
                              </FormLabel>
                              <span className="text-sm font-medium text-gray-700">$15.00</span>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Payment Details */}
              <Accordion type="single" collapsible defaultValue="payment-details" className="w-full">
                <AccordionItem value="payment-details" className="border-purple-200 bg-white rounded-lg shadow-lg">
                  <AccordionTrigger className="px-6 py-4 text-2xl text-purple-700 hover:no-underline">
                    <div className="flex items-center">
                        <CreditCard className="mr-3 h-6 w-6 text-pink-500"/>
                        Payment Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pt-0 pb-6 space-y-4">
                    <FormField
                      control={form.control}
                      name="cardName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name on Card</FormLabel>
                          <FormControl>
                            <Input placeholder="L. B. Lover" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="•••• •••• •••• ••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date (MM/YY)</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                        <Lock className="h-4 w-4 text-green-600" />
                        <span>Your payment information is encrypted and secure.</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg border-pink-200 bg-white sticky top-24"> {/* Sticky for longer forms */}
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700 flex items-center">
                    <ShoppingCart className="mr-3 h-6 w-6 text-pink-500"/>
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sampleCartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between space-x-2">
                      <div className="flex items-center space-x-3">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover border"/>
                        <div>
                          <p className="font-medium text-purple-800 line-clamp-1">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-pink-600">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <Separator className="my-4 bg-pink-200"/>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2 bg-pink-200"/>
                    <div className="flex justify-between text-xl font-bold text-purple-700">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-purple-50 border-purple-100 w-full">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm cursor-pointer">
                            I agree to the <Link to="/terms" className="text-pink-600 hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-pink-600 hover:underline">Privacy Policy</Link>.
                          </FormLabel>
                          <FormMessage className="text-xs" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg py-3" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Processing...' : 'Place Order'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </main>

      {/* Footer */}
      <footer className="border-t border-pink-200 bg-white mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Labubu Store. All rights reserved.</p>
          <p className="text-sm">Find your dreamy Labubu today!</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="text-xs text-purple-600 hover:text-pink-600">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-purple-600 hover:text-pink-600">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;