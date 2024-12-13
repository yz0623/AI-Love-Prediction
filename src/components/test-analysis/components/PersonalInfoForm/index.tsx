import { useState, useEffect } from 'react';
import { useTest } from '../../context/TestContext';
import { questions } from '../../data/questions';

interface PersonalInfo {
  name: string;
  gender: 'male' | 'female';
  age: number;
  role: 'self' | 'partner';
}

export default function PersonalInfoForm() {
  const { state, dispatch } = useTest();
  
  // 根据第一个人的信息设置默认值
  const getDefaultInfo = (): PersonalInfo => {
    // 如果已有自己的信息，则设置为伴侣的默认值
    if (state.personalInfo?.self) {
      return {
        name: '',
        gender: state.personalInfo.self.gender === 'male' ? 'female' : 'male',
        age: 18,
        role: 'partner', // 强制设置为伴侣
      };
    }
    // 如果已有伴侣的信息，则设置为自己的默认值
    if (state.personalInfo?.partner) {
      return {
        name: '',
        gender: state.personalInfo.partner.gender === 'male' ? 'female' : 'male',
        age: 18,
        role: 'self', // 强制设置为自己
      };
    }
    // 第一次填写的默认值
    return {
      name: '',
      gender: 'male',
      age: 18,
      role: 'self',
    };
  };

  const [info, setInfo] = useState<PersonalInfo>(getDefaultInfo());

  // 当 personalInfo 改变时更新表单状态
  useEffect(() => {
    setInfo(getDefaultInfo());
  }, [state.personalInfo?.self, state.personalInfo?.partner]);

  // 表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (state.personalInfo?.self && info.role === 'self') {
      dispatch({
        type: 'SET_ERROR',
        payload: '已填写过自己的信息',
      });
      return;
    }

    if (state.personalInfo?.partner && info.role === 'partner') {
      dispatch({
        type: 'SET_ERROR',
        payload: '已填写过伴侣的信息',
      });
      return;
    }

    // 保存个人信息
    dispatch({
      type: 'SET_PERSONAL_INFO',
      payload: {
        role: info.role,
        info,
      },
    });

    // 如果双方信息都已填写,开始测试
    if (
      (info.role === 'self' && state.personalInfo?.partner) ||
      (info.role === 'partner' && state.personalInfo?.self)
    ) {
      dispatch({ 
        type: 'START_TEST',
        payload: {
          totalQuestions: questions.length,
          startRole: 'self',
        }
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {state.personalInfo?.self ? '填写伴侣信息' : '填写个人信息'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">姓名</label>
          <input
            type="text"
            value={info.name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
            required
            placeholder={state.personalInfo?.self ? '请输入伴侣姓名' : '请输入姓名'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">性别</label>
          <select
            value={info.gender}
            onChange={(e) => setInfo({ ...info, gender: e.target.value as 'male' | 'female' })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
          >
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">年龄</label>
          <input
            type="number"
            min="18"
            max="100"
            value={info.age}
            onChange={(e) => setInfo({ ...info, age: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">身份</label>
          <select
            value={info.role}
            onChange={(e) => setInfo({ ...info, role: e.target.value as 'self' | 'partner' })}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
            disabled={!!state.personalInfo?.self || !!state.personalInfo?.partner} // 任何一方信息存在时禁用选择
          >
            <option value="self">自己</option>
            <option value="partner">伴侣</option>
          </select>
          {state.personalInfo?.self && (
            <p className="text-sm text-gray-500 mt-1">
              已填写{state.personalInfo.self.name}的信息，现在填写伴侣信息
            </p>
          )}
          {state.personalInfo?.partner && (
            <p className="text-sm text-gray-500 mt-1">
              已填写{state.personalInfo.partner.name}的信息，现在填写自己的信息
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
        >
          {state.personalInfo?.self ? '开始测试' : '下一步'}
        </button>
      </form>

      {state.error && (
        <div className="mt-4 text-center text-red-500">
          {state.error}
        </div>
      )}
    </div>
  );
} 