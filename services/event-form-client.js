import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export async function uploadPoster(file){
    const extension = file.name.split('.').pop();
    const fileName = `${Date.now()}.${extension}`;

    const {error: uploadError} = await supabase.storage.from('event-posters').upload(fileName, file, {upsert: false});

    if(uploadError) throw uploadError;

    //grab url
    const {data: {publicUrl}} = supabase.storage.from('event-posters').getPublicUrl(fileName);
    return publicUrl;
}

export async function insertEventProposal(payload){
    const {error} = await supabase.from('event_proposals').insert(payload);
    if (error) throw error;
}