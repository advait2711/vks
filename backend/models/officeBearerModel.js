import supabase from '../config/supabase.js';

/**
 * Get office bearers for a specific term
 */
export const getOfficeBearersByTerm = async (termStart = '2025', termEnd = '2028') => {
    const { data, error } = await supabase
        .from('office_bearers')
        .select('*')
        .eq('term_start', termStart)
        .eq('term_end', termEnd)
        .order('display_order', { ascending: true });

    if (error) {
        throw error;
    }

    return data;
};

/**
 * Get all office bearers
 */
export const getAllOfficeBearers = async () => {
    const { data, error } = await supabase
        .from('office_bearers')
        .select('*')
        .order('term_start', { ascending: false })
        .order('display_order', { ascending: true });

    if (error) {
        throw error;
    }

    return data;
};
