// import React from "react";
// import PayOS from "@payos/node";
// import { Form, redirect } from "@remix-run/react";
// import { ActionFunctionArgs } from "react-router";
// export async function action({ request }: ActionFunctionArgs) {
//   const payos = new PayOS(
//     "706f550b-5304-45de-a230-e42c98136afa",
//     "819a18ec-231a-47e6-bc6b-b30385bcff57",
//     "ebeac651cb3a2a78972b72d9048c96c626ba0a7196e453e10924de8414556a47"
//   );
//   const requestData = {
//     orderCode: 123,
//     amount: 2003,
//     description: "Thanh toan dat san nhe",
//     items: [
//       {
//         name: "Mì tôm hảo hảo ly",
//         quantity: 1,
//         price: 10004,
//       },
//     ],
//     cancelUrl: "http://localhost:5173/?a",
//     returnUrl: "http://localhost:5173/?b",
//   };
//   const paymentLinkData = await payos.createPaymentLink(requestData);

//   return redirect(paymentLinkData.checkoutUrl);
// }
// function Payment() {
//   return (
//     <div>
//       <Form method="POST">
//         Check chức năng thanh toán online
//         <button className="btn">Thanh toán</button>
//       </Form>
//     </div>
//   );
// }

// export default Payment;
