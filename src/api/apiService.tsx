import React from 'react'
import axios from 'axios';

export const fetchData = async (table: string) => {
    try {
        const response = await axios.get(`http://localhost:8080/supabase/fetch/${table}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchDataOther = async (table: string, other: any) => {
    try {
        const response = await axios.post(`http://localhost:8080/supabase/fetch/other/${table}`, other,
            {
                headers: { 'Content-Type': 'application/json' }
            });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postData = async (table: string, data: any) => {
    try {
        const res = await axios.post(`http://localhost:8080/supabase/post/${table}`, data);
        return res;
    } catch (error) {
        throw error;
    }
}

export const upData = async (table: string, data: any) => {
    try {
        const res = await axios.patch(`http://localhost:8080/supabase/update/${table}`, data);
        return res;
    } catch (error) {
        throw error;
    }
}

export const deleteData = async (table: string, data: any) => {
    try {
        const res = await axios.post(`http://localhost:8080/supabase/delete/${table}`, data);
        return res;
    } catch (error) {
        throw error;
    }
}