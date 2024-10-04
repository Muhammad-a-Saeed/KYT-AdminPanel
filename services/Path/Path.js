import axios from "axios";
export const apiUrl = "https://api.mamvoapp.com/";

const userLogin = async (payLoad) => {
  const { data } = await axios.post(
    `${apiUrl}api/v1/user/admin-login`,
    payLoad
  );
  return data;
};
const getAllUserData = async (token, pageNumber, size) => {
  console.log(token);
  const { data } = await axios.get(
    `${apiUrl}api/v1/user/getAllUsers?page=${pageNumber}&limit=${size}`,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const getAllEventsData = async (token,startDate,endDate,musicGeneres,latitude,longitude,radius, pageNumber, size) => {
  console.log(token);
  const { data } = await axios.get(
    `${apiUrl}api/v2/events?startDate=${startDate}&endDate=${endDate}&category=${musicGeneres}&lat=${latitude}&lon=${longitude}&radius=${radius}&page=${pageNumber}&limit=${size}`,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const addEvent = async (token, payload) => {
  console.log(payload, "payload");
  const { data } = await axios.post(
    `${apiUrl}api/v2/events/create-custom-event`,
    payload,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const editEventData = async (token, payload, _id) => {
  const { data } = await axios.patch(`${apiUrl}api/v2/events/update-event/${_id}`, payload, {
    headers: { authorization: token },
  });
  return data;
};
const deleteEventData = async (token, _id) => {
  console.log(_id,"delToken");
  const { data } = await axios.delete(`${apiUrl}api/v2/events/delete-event/${_id}`, {
    headers: { authorization: token },
  });
  return data;
};
const getAllDiscountData = async (token, pageNumber, size) => {
  console.log(token);
  const { data } = await axios.get(
    `${apiUrl}api/v1/discounts?page=${pageNumber}&limit=${size}`,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const AddDiscountData = async (token, payload) => {
  console.log(payload, "payload");
  const { data } = await axios.post(
    `${apiUrl}api/v1/discounts/create-discount`,
    payload,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const editDiscountData = async (token, payload, _id) => {
  const { data } = await axios.patch(`${apiUrl}api/v1/discounts/update-discount/${_id}`, payload, {
    headers: { authorization: token },
  });
  return data;
};
const deleteDiscountData = async (token, _id) => {
  console.log(_id,"delToken");
  const { data } = await axios.delete(`${apiUrl}api/v1/discounts/delete-discount/${_id}`, {
    headers: { authorization: token },
  });
  return data;
};
const getAllPublicRelationData = async (token, pageNumber, size) => {
  console.log(token);
  const { data } = await axios.get(
    `${apiUrl}api/v1/user/get-all-pr-requests?page=${pageNumber}&limit=${size}`,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const editPublicRelationData = async (token, payload, _id) => {
  const { data } = await axios.patch(`${apiUrl}api/v1/user/change-pr-status/${_id}`, payload, {
    headers: { authorization: token },
  });
  return data;
};
const getAllPublicAffiliateData = async (token, pageNumber, size) => {
  console.log(token);
  const { data } = await axios.get(
    `${apiUrl}api/v1/user/get-all-affiliate-requests?page=${pageNumber}&limit=${size}`,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const editPublicAffiliateData = async (token, payload, _id) => {
  const { data } = await axios.patch(`${apiUrl}api/v1/user/change-Affiliate-status/${_id}`, payload, {
    headers: { authorization: token },
  });
  return data;
};
const getAllManageAttendanceData = async (token, pageNumber, size) => {
  console.log(token);
  const { data } = await axios.get(
    `${apiUrl}api/v1/free-attendance/get-all-free-attendance-requests?page=${pageNumber}&limit=${size}`,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const editAttendanceFreeData = async (token, payload, _id) => {
  const { data } = await axios.patch(`${apiUrl}api/v1/free-attendance/change-free-attendance-request-status/${_id}`, payload, {
    headers: { authorization: token },
  });
  return data;
};

const addAboutUs = async (token, payload) => {
  console.log(payload, "payload");
  const { data } = await axios.post(
    `${apiUrl}api/v1/about/create-about`,
    payload,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const editAboutUs = async (token, payload,_id) => {
  const { data } = await axios.patch(
    `${apiUrl}api/v1/about/update-about/${_id}`,
    payload,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const getAboutUsData = async (token) => {
  console.log(token);
  const { data } = await axios.get(
    `${apiUrl}api/v1/about`,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const getPrivacyPolicyData = async (token) => {
  console.log(token);
  const { data } = await axios.get(
    `${apiUrl}api/v1/privacy`,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const addPrivacyPolicy = async (token, payload) => {
  console.log(payload, "payload");
  const { data } = await axios.post(
    `${apiUrl}api/v1/privacy/create-policy`,
    payload,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const editPrivacyPolicy = async (token, payload,_id) => {
  const { data } = await axios.patch(
    `${apiUrl}api/v1/privacy/update-policy/${_id}`,
    payload,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const getTermsAndConditionData= async (token) => {
  console.log(token);
  const { data } = await axios.get(
    `${apiUrl}api/v1/termsandcondition`,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const addTermsAndCondition = async (token, payload) => {
  console.log(payload, "payload");
  const { data } = await axios.post(
    `${apiUrl}api/v1/termsandcondition/create-terms`,
    payload,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const editTermsAndCondition = async (token, payload,_id) => {
  const { data } = await axios.patch(
    `${apiUrl}api/v1/termsandcondition/update-terms/${_id}`,
    payload,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const getContactUs= async (token) => {
  console.log(token);
  const { data } = await axios.get(
    `${apiUrl}api/v1/contact`,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const addContactUs = async (token, payload) => {
  console.log(payload, "payload");
  const { data } = await axios.post(
    `${apiUrl}api/v1/contact/create-contact`,
    payload,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const editContactUs = async (token, payload,_id) => {
  const { data } = await axios.patch(
    `${apiUrl}api/v1/contact/update-contact/${_id}`,
    payload,
    {
      headers: { authorization: token },
    }
  );
  return data;
};
const getAllStats = async (token) => {
  const { data } = await axios.get(`${apiUrl}api/v1/user/get-stats`, {
    headers: { authorization: token },
  });
  return data;
};

export {
  getAllStats,
  userLogin,
  getAllUserData,
  getAllEventsData,
  addEvent,
  getAllPublicRelationData,
  getAboutUsData,
  addAboutUs,
  editAboutUs,
  getPrivacyPolicyData,
  addPrivacyPolicy,
  editPrivacyPolicy,
  getTermsAndConditionData,
  addTermsAndCondition,
  editTermsAndCondition,
  getContactUs,
  addContactUs,
  editContactUs,
  getAllPublicAffiliateData,
  editPublicRelationData,
  editPublicAffiliateData,
  deleteEventData,
  editEventData,
  getAllManageAttendanceData,
  editAttendanceFreeData,
  AddDiscountData,
  editDiscountData,
  deleteDiscountData,
  getAllDiscountData
};
