import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import CloseButtonPayement from '../Styles/CloseButtonPayment';
import './PaymentsStyle.css';
import { CreateOrderPayments } from '../redux/actions/Payments';
import { removeManyCarts } from '../redux/actions/carts';
const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: 'Open Sans, sans-serif',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#c23d4b',
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <TextField
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      defaultValue={value}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? 'Processing...' : children}
  </button>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#cb436b"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const Payments = ({ total, cartIds, IdItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [billingDetails, setBillingDetails] = useState({
    email: 's@test.com',
    phone: '11111',
    name: 's',
    address: {
      city: 'test',
      line1: 'test',
      state: 'test',
      postal_code: 'test',
    },
  });
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(removeManyCarts(cartIds));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    });

    if (payload.error) {
      setError(payload.error);
    } else {
      setPaymentMethod(payload.paymentMethod);
      let Payment = payload;
      let { id } = payload.paymentMethod;
      dispatch(CreateOrderPayments(cartIds, Payment, id, IdItems));
    }
  };
  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: '',
      phone: '',
      name: '',
      address: {
        city: '',
        line1: '',
        state: '',
      },
    });
  };

  return (
    <React.Fragment>
      <h4
        onClick={handleClickOpen}
        style={{
          padding: '4px',
          fontSize: '19px',
          textTransform: 'uppercase',
          textAlign: 'center',
          border: '1px solid',
        }}
      >
        ORDER NOW
      </h4>

      <div
        style={{
          width: '100%',
        }}
      >
        <Dialog
          open={open}
          keepMounted
          // scroll={scroll}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <header>
            {paymentMethod && (
              <CloseButtonPayement onClick={handleClose}>
                &times;
              </CloseButtonPayement>
            )}
          </header>
          {paymentMethod ? (
            <div className="Result">
              <h1 role="alert">Payment successful</h1>
              <div
                style={{
                  color: '#333',
                }}
              >
                Thank you for your order. Your order key is <br />
                {paymentMethod.id}.
                <br /> We have emailed your order confirmation,
                <br />
                and will send you an update when your order has shipped.
              </div>
              <ResetButton onClick={reset} />
            </div>
          ) : (
            <div>
              <form
                className="Form"
                onSubmit={handleSubmit}
                style={{
                  padding: '20px',
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                }}
              >
                <fieldset className="FormGroup">
                  <Field
                    label="Name"
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    required
                    autoComplete="name"
                    value={billingDetails.name}
                    onChange={(e) => {
                      setBillingDetails({
                        ...billingDetails,
                        name: e.target.value,
                      });
                    }}
                  />
                  <Field
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="janedoe@gmail.com"
                    required
                    autoComplete="email"
                    value={billingDetails.email}
                    onChange={(e) => {
                      setBillingDetails({
                        ...billingDetails,
                        email: e.target.value,
                      });
                    }}
                  />
                  <Field
                    label="Phone"
                    id="phone"
                    type="tel"
                    placeholder="(941) 555-0123"
                    required
                    autoComplete="tel"
                    value={billingDetails.phone}
                    onChange={(e) => {
                      setBillingDetails({
                        ...billingDetails,
                        phone: e.target.value,
                      });
                    }}
                  />
                  <Field
                    label="City"
                    id="city"
                    type="text"
                    placeholder="San Francisco"
                    required
                    autoComplete="text"
                    value={billingDetails.address.city}
                    onChange={(e) => {
                      setBillingDetails({
                        ...billingDetails,
                        city: e.target.value,
                      });
                    }}
                  />
                  <Field
                    label="Address"
                    id="line1"
                    type="text"
                    placeholder="Delmas 33 # 20"
                    required
                    autoComplete="text"
                    value={billingDetails.address.line1}
                    onChange={(e) => {
                      setBillingDetails({
                        ...billingDetails,
                        line1: e.target.value,
                      });
                    }}
                  />
                  <Field
                    label="State"
                    id="state"
                    type="text"
                    placeholder="Port-au-Prince"
                    required
                    autoComplete="text"
                    value={billingDetails.address.state}
                    onChange={(e) => {
                      setBillingDetails({
                        ...billingDetails,
                        state: e.target.value,
                      });
                    }}
                  />
                </fieldset>
                <fieldset className="FormGroup">
                  <CardField
                    onChange={(e) => {
                      setError(e.error);
                      setCardComplete(e.complete);
                    }}
                  />
                </fieldset>
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
                <SubmitButton
                  processing={processing}
                  error={error}
                  disabled={!stripe || processing}
                >
                  Pay ${total}
                </SubmitButton>
              </form>
            </div>
          )}
        </Dialog>
      </div>
    </React.Fragment>
  );
};
export default Payments;
