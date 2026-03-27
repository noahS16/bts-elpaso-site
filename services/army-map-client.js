import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export async function addCity(place) {
    let country = place.address.country == "Estados Unidos de América" ? "United States" : place.address.country;
    const payload = {
        p_city: place.address.city || place.address.town || place.address.village || place.address.municipality || place.address.hamlet || place.address.province || "ARMY",
        p_state: place.address.state || "",
        p_country: country == "Mexico" ? "México" : country,
        p_lat: place.lat,
        p_lon: place.lon,
        p_country_code: place.address.country_code || '',
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
    return `${data.city}`;
}

export async function getSecondHighestPopulation() {
    const { data, error } = await supabase.from('top_cities').select('*');
    if (error) throw error;
    //console.log(data);
    return data[1].city;
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
    return data;
    //return `${data.city} (~${data.distance_miles.toFixed(1)} miles)`;
    
}

export async function getTotalCities(){
    const { count, error } = await supabase
        .from('army_cities')
        .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count;
}

export async function getAllStats() {
    const [totalArmy, totalCountries, highestPopulation, furthestArmy, totalCities, topCities, recentCity,] = await Promise.all([
        getTotalArmy(),
        getTotalCountries(),
        getSecondHighestPopulation(),
        getFurthestArmy(),
        getTotalCities(),
        getTopCities(),
        getRecentlyAdded(),
    ]);
    console.log({
        totalArmy,
        totalCountries,
        highestPopulation,
        furthestArmy,
        totalCities,
        topCities,
        recentCity,
    });
    return {
        totalArmy,
        totalCountries,
        highestPopulation,
        furthestArmy,
        totalCities,
        topCities,
        recentCity,
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

async function getTopCities(){
    const {data, error} = await supabase.from('top_cities').select('*');
    if(error) throw error;
    //console.log(data);
    return data;
}

async function getRecentlyAdded(){
    const {data, error} = await supabase.from('recent_city ').select('*');
    if (error) throw error;
    return data[0];
}

async function addCodes(){
    const {data, error} = await supabase.from('army_cities').update({
        country_code: 'us',
    }).eq('country', 'United States');
    if (error) throw error;
    console.log("success")
}
