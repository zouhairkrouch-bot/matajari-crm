const { createClient } = require('@supabase/supabase-js');

function getSupabase(token) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
    global: { headers: { Authorization: 'Bearer ' + token } }
  });
}

function corsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

module.exports = async (req, res) => {
  corsHeaders(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const supabase = getSupabase(token);

  // GET — جلب كل الطلبات
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('order_date', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  // POST — إضافة أو تحديث طلب
  if (req.method === 'POST') {
    const order = req.body;
    const { data, error } = await supabase
      .from('orders')
      .upsert(order, { onConflict: 'id' })
      .select();
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
};
