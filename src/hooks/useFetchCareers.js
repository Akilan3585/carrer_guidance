import { useState, useEffect } from 'react';

const mockCareers = [
  {
    title: 'Software Engineer',
    description: 'Design and develop scalable software solutions using modern technologies and best practices.',
    skills: ['JavaScript', 'React', 'Node.js', 'System Design', 'Algorithms']
  },
  {
    title: 'Data Scientist',
    description: 'Analyze complex data sets to drive business decisions and develop predictive models.',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization']
  },
  {
    title: 'AI/ML Engineer',
    description: 'Build and deploy machine learning models and AI solutions for real-world problems.',
    skills: ['TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision']
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect systems and networks from cyber threats and implement security measures.',
    skills: ['Network Security', 'Penetration Testing', 'Risk Analysis', 'Security Tools', 'Cryptography']
  },
  {
    title: 'Cloud Architect',
    description: 'Design and implement cloud infrastructure solutions for scalable applications.',
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Infrastructure as Code']
  },
  {
    title: 'DevOps Engineer',
    description: 'Streamline development and deployment processes through automation and tooling.',
    skills: ['CI/CD', 'Docker', 'Kubernetes', 'Monitoring', 'Shell Scripting']
  }
];

const useFetchCareers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCareers(mockCareers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch career recommendations');
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  return { careers, loading, error };
};

export default useFetchCareers;