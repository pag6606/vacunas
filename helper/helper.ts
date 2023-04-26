export async function getEmployees() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/employees`;
    const res = await fetch(url);
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
