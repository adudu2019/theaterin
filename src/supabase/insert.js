import { supabase } from "./Client";

export const InsertCustomer = async (name, title, duration, varian, date) => {
    const { data, error } = await supabase
    .from('movie')
    .insert([
      { name: name, title_film:title, duration: duration, varian_film:varian, date:date},
    ])
    .select()
    console.log(data);
    return {error}
}

export const ReadCustomer = async () => {
  try {
    const { data: movie, error } = await supabase
      .from('movie')
      .select('*');
    
    if (error) {
      console.error(error.message);
      return { error };
    }

    return { movie, error: null };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { error: 'Error fetching data' };
  }
}

export const deleteCustomer = async (id) => {
  const { error } = await supabase
    .from('movie')
    .delete()
    .eq('id', id)
  return { error }
}




          