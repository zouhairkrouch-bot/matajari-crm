const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    // تسجيل الدخول بـ Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) return res.status(401).json({ error: 'البريد أو كلمة المرور غير صحيحة' });

    // جلب بيانات الدور من جدول agents
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .eq('email', email)
      .single();

    if (agentError || !agent) return res.status(403).json({ error: 'هذا الإيميل غير مسجل في النظام' });

    res.json({
      token: authData.session.access_token,
      user: { role: agent.role, name: agent.name, initials: agent.initials, email: agent.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
