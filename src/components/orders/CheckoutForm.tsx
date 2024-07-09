import { useToast } from '@chakra-ui/react';
import { useStripe, useElements, PaymentElement, Elements} from '@stripe/react-stripe-js';import { loadStripe } from '@stripe/stripe-js';
import { stripePublicToken } from '../../data/api/stripeConfig';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../data/store';
import { fetchPaymentToken } from '../../data/reducers/payment.reducer';


function CheckoutForm () {
  const params = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/payment-completed/${params.id}`,
      },
    });

    if (result.error) {
      toast({
        title: 'An error occurred',
        description: `${result.error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button style={{marginTop: '10px'}} disabled={!stripe}>Submit</button>
    </form>
  )
};

function CheckoutFormInjected() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const stripePromise = loadStripe(stripePublicToken);
  const tokenSelector = useAppSelector(x=>x.payments.value.token);

  if(!tokenSelector){
    dispatch(fetchPaymentToken({orderId: params.id as any as number}))
    .then(()=>{console.log("")});
  }

  const options = {
    clientSecret: tokenSelector,
  };

  return tokenSelector ? (
  <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
    ):(<></>)
  
  ;
}

export default CheckoutFormInjected;