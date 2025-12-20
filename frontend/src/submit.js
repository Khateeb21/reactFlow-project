// submit.js
import { useStore } from './store';
import "./index.css"


export function SubmitButton() {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges,
        }),
      });

      const data = await res.json();

      alert(
        `Pipeline Analysis ✅\n\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? 'Yes' : 'No ❌'}`
      );
    } catch (err) {
      console.error(err);
      alert('Failed to submit pipeline');
    }
  };

  return (
    <button onClick={handleSubmit}  style={{
    display: 'block',
    margin: '24px auto',       // centers horizontally and adds top margin
    backgroundColor: '#2563eb',
    color: 'white',
    fontWeight: 600,
    padding: '12px 24px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }}>
      Submit Pipeline
    </button>
  );
}
