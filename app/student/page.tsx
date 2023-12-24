import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

interface Student {
  id: string;
  title: string;
}

export default async function Student() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: students } = await supabase.from("student").select();
  return (
    <div className="flex items-center justify-center">
      <table className="border-2">
        <tbody>
        <tr className="border-3 border-black">
          <th>ID</th>
          <th>Student Description</th>
        </tr>
        {students &&
          students.map(({ id, title }) => (
            <tr key={id} className="border-2 border-green-300">
              <td>{id}</td>
              <td>{title}</td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
}
