import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export async function addCity(place) {
    const payload = {
        p_city: place.address.city || place.address.town || place.address.village || place.address.municipality || "Unknown",
        p_state: place.address.state || "",
        p_country: place.address.country,
        p_lat: place.lat,
        p_lon: place.lon
    };
    const { error } = await supabase.rpc('add_or_increment_city', payload);
    if (error) {
        console.error('Error adding city:', error);
        return;
    }
}

export async function getTotalArmy() {
    let { data: army_counts, error } = await supabase
        .from('army_cities')
        .select('population');

    if (error) {
        console.error('Error fetching army counts:', error);
        return 0;
    }
    let total = 0;
    army_counts.forEach(city => {
        total += city.population;
    });
    //console.log(total);
    return total;
}

export async function getTotalCountries() {
    const { data, error } = await supabase.rpc('get_unique_country_count');

    if (error) {
        console.error('Error fetching country counts:', error);
        return 0;
    }
    //console.log(data);
    return data;
}

export async function getHighestPopulation() {
    const { data, error } = await supabase
        .from('top_city_by_population')
        .select('*')
        .single();
    if (error) {
        console.error('Error fetching highest population city:', error);
        return null;
    }
    //console.log(data);
    return `${data.city}, ${data.country}`;
}

export async function getFurthestArmy() {
    const { data, error } = await supabase
        .from('farthest_city_from_el_paso_miles')
        .select('*')
        .single();
    
    if (error) {
        console.error('Error fetching farthest city:', error);
        return null;
    }

    
    //console.log(`${data.label} is the farthest city, ${data.distance_miles.toFixed(1)} miles away, with ${data.population} ARMY`);
    return `${data.city} (~${data.distance_miles.toFixed(1)} miles)`;
    
}

export async function getAllStats() {
    const [totalArmy, totalCountries, highestPopulation, furthestArmy] = await Promise.all([
        getTotalArmy(),
        getTotalCountries(),
        getHighestPopulation(),
        getFurthestArmy()
    ]);
    console.log({
        totalArmy,
        totalCountries,
        highestPopulation,
        furthestArmy
    });
    return {
        totalArmy,
        totalCountries,
        highestPopulation,
        furthestArmy
    };
}

export async function getUniquePlaces() {
    const { data, error } = await supabase
        .from('army_cities')
        .select('city, state, country, population, lat, lon', {distinct: true});

    if (error) {
        console.error('Error fetching unique places:', error);
        return [];
    }
    //console.log(data);
    return data;
}
