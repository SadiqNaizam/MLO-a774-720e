import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Trash2, ShoppingBag, Home, List } from 'lucide-react';
import { toast as sonnerToast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  slug: string; 
}

const initialCartItems: CartItem[] = [
  { id: '1', name: 'Lulu the Lamb - Forest Fairy Series', price: 59.99, quantity: 1, imageUrl: 'https://source.unsplash.com/random/80x80/?cute,lamb,doll', slug: 'lulu-the-lamb' },
  { id: '2', name: 'Zimomo the Explorer - Adventure Set', price: 79.50, quantity: 2, imageUrl: 'https://source.unsplash.com/random/80x80/?cute,monster,doll', slug: 'zimomo-the-explorer' },
  { id: '3', name: 'Pucky the Dreamer - Starry Night Edition', price: 45.00, quantity: 1, imageUrl: 'https://source.unsplash.com/random/80x80/?cute,elf,doll', slug: 'pucky-the-dreamer' },
];

const CartPage = () => {
  console.log('CartPage loaded');
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const quantity = Math.max(1, newQuantity); // Ensure quantity is at least 1
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    if (itemToRemove) {
        sonnerToast.error(`${itemToRemove.name} removed from cart.`, {
            description: "Your cart has been updated."
        });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = cartItems.length > 0 ? 5.00 : 0; // Example flat shipping rate
  const total = subtotal + shippingCost;

  // Simple Header Component
  const PageHeader = () => (
    <header className="bg-pink-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-3xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
            Labubu Land
          </Link>
          <nav className="flex items-center space-x-4 sm:space-x-6">
            <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors flex items-center">
              <Home className="h-5 w-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Home</span>
            </Link>
            <Link to="/product-listing" className="text-gray-700 hover:text-pink-600 transition-colors flex items-center">
              <List className="h-5 w-5 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Shop All</span>
            </Link>
            <Link to="/cart" className="text-pink-600 font-semibold hover:text-pink-700 transition-colors flex items-center relative">
              <ShoppingBag className="h-6 w-6 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Cart</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );

  // Simple Footer Component
  const PageFooter = () => (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Labubu Land. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">Bringing joy, one Labubu at a time!</p>
      </div>
    </footer>
  );


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <PageHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-grow">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-8 text-center">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow-lg p-8">
            <ShoppingBag className="h-20 w-20 text-pink-400 mx-auto mb-6" />
            <p className="text-xl text-gray-600 mb-4">Your cart is currently empty.</p>
            <p className="text-gray-500 mb-8">Looks like you haven't added any Labubus yet!</p>
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white" asChild>
              <Link to="/product-listing">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-xl">
              <Table>
                <TableCaption className="text-sm text-gray-500 mt-4">Review your items and proceed to checkout.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] hidden sm:table-cell">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-center w-32">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center w-20">Remove</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map(item => (
                    <TableRow key={item.id} className="hover:bg-pink-50/50 transition-colors">
                      <TableCell className="hidden sm:table-cell">
                        <Link to={`/product-detail?slug=${item.slug}`}>
                          <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link to={`/product-detail?slug=${item.slug}`} className="text-purple-600 hover:text-pink-600 hover:underline transition-colors">
                          {item.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="w-20 text-center mx-auto border-pink-300 focus:border-pink-500 focus:ring-pink-500"
                          aria-label={`Quantity for ${item.name}`}
                        />
                      </TableCell>
                      <TableCell className="text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name} from cart`}>
                          <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700 transition-colors" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-xl bg-white rounded-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-700">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-semibold">{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'FREE'}</span>
                  </div>
                  <hr className="my-2 border-pink-200"/>
                  <div className="flex justify-between text-xl font-bold text-purple-700">
                    <span>Estimated Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex-col space-y-3 pt-6">
                  <Button 
                    size="lg" 
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg py-3" 
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" size="lg" className="w-full border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-600 py-3" asChild>
                    <Link to="/product-listing">Continue Shopping</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      <PageFooter />
    </div>
  );
};

export default CartPage;