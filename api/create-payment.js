const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // 本番環境ではsandboxをapi-m.paypal.comに変更
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID; // PayPal Client ID
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET; // PayPal Secret

// 支払い作成エンドポイント
router.post('/create-payment', async (req, res) => {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const { total } = req.body; // 支払い金額をリクエストから取得

  try {
    const response = await fetch(`${PAYPAL_API}/v1/payments/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        intent: 'sale',
        payer: { payment_method: 'paypal' },
        transactions: [
          {
            amount: { total: total, currency: 'USD' },
          },
        ],
        redirect_urls: {
          return_url: 'http://localhost:3000/service', // 支払い完了後のリダイレクトURL
          cancel_url: 'http://localhost:3000/cancel', // 支払いキャンセル時のリダイレクトURL
        },
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error creating PayPal payment:', error);
    res.status(500).send('Error creating payment');
  }
});

module.exports = router;
