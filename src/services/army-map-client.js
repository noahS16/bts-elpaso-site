import { createClient } from 'npm:@supabase/supabase-js@2'
require('dotenv').config()

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

async function addCity(payload){
    
}
