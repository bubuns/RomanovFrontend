import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ResourcesPage.css';
import API from '../api'; // Импортируем единый API
import CustomAlert from '../components/CustomAlert';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const fetchedResources = await API.resources.getResources();
        setResources(fetchedResources);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке ресурсов:', error);
        setAlert({
          show: true,
          message: 'Ошибка при загрузке ресурсов',
          type: 'error'
        });
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Заглушка для примера, если API еще не реализован
  const dummyResources = [
    {
      id: 1,
      title: 'Руководство по защите от фишинга',
      description: 'Полное руководство по распознаванию и защите от фишинговых атак.',
      category: 'articles',
      type: 'Статья',
      image: 'https://images.unsplash.com/photo-1573164713791-0dfcd2a183a7?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/resource/1'
    },
    {
      id: 2,
      title: 'Основы криптографии',
      description: 'Введение в мир криптографии и шифрования данных.',
      category: 'articles',
      type: 'Статья',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      link: '/resource/2'
    },
    {
      id: 3,
      title: 'Курс по ИБ от Google',
      description: 'Бесплатный онлайн-курс по информационной безопасности от Google.',
      category: 'courses',
      type: 'Внешний курс',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
      link: 'https://example.com/course'
    },
    {
      id: 4,
      title: 'Подкаст "Кибербезопасность сегодня"',
      description: 'Еженедельные обсуждения актуальных тем кибербезопасности с экспертами отрасли.',
      category: 'podcasts',
      type: 'Подкаст',
      image: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?q=80&w=2546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: 'https://example.com/podcast'
    },
    {
      id: 5,
      title: 'Инструменты для аудита безопасности',
      description: 'Обзор популярных инструментов для проведения аудита безопасности систем.',
      category: 'tools',
      type: 'Инструменты',
      image: 'https://plus.unsplash.com/premium_photo-1670402130476-25aa8c1986c9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/resource/5'
    },
    {
      id: 6,
      title: 'Хакерские конференции 2024',
      description: 'Календарь основных хакерских конференций и мероприятий по кибербезопасности на 2024 год.',
      category: 'events',
      type: 'События',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
      link: '/resource/6'
    },
    {
      id: 7,
      title: 'Безопасность сетей',
      description: 'Курс по безопасности компьютерных сетей, включающий защиту от сетевых атак, настройку файрволов и систем обнаружения вторжений.',
      category: 'tools',
      type: 'Инструменты',
      image: 'https://images.unsplash.com/photo-1573496773905-f5b17e717f05?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/resource/7'
    }
  ];

  // Если ресурсы еще не загрузились из API, используем заглушку
  const allResources = resources.length > 0 ? resources : dummyResources;
  
  // Фильтрация ресурсов по категории
  const filteredResources = activeCategory === 'all' 
    ? allResources 
    : allResources.filter(resource => resource.category === activeCategory);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Дефолтные картинки по названию ресурса
  const defaultImages = {
    'Руководство по защите от фишинга': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    'Инструменты для аудита безопасности': 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
    'Безопасность сетей': 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    'Подкаст "Кибербезопасность сегодня"': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    'Хакерские конференции 2024': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    default: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  };

  return (
    <div className="resources-page">
      <CustomAlert 
        message={alert.message} 
        show={alert.show} 
        type={alert.type} 
        onClose={() => setAlert({...alert, show: false})} 
      />

      {/* Заголовок страницы */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="IT ресурсы" className="page-header-image mb-4" style={{maxWidth: '350px', width: '100%', borderRadius: '12px'}} />
          <h1>Полезные ресурсы по кибербезопасности</h1>
          <p className="lead">Статьи, курсы, инструменты и другие материалы для расширения ваших знаний</p>
        </div>
      </header>

      {/* Категории ресурсов */}
      <section className="py-3 bg-light">
        <div className="container">
          <div className="category-tabs">
            <button 
              className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              Все ресурсы
            </button>
            <button 
              className={`category-tab ${activeCategory === 'articles' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('articles')}
            >
              Статьи
            </button>
            <button 
              className={`category-tab ${activeCategory === 'courses' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('courses')}
            >
              Курсы
            </button>
            <button 
              className={`category-tab ${activeCategory === 'tools' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('tools')}
            >
              Инструменты
            </button>
            <button 
              className={`category-tab ${activeCategory === 'podcasts' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('podcasts')}
            >
              Подкасты
            </button>
            <button 
              className={`category-tab ${activeCategory === 'events' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('events')}
            >
              События
            </button>
          </div>
        </div>
      </section>

      {/* Список ресурсов */}
      <section className="py-5">
        <div className="container">
          {isLoading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p>Загрузка ресурсов...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center">
              <p>Ресурсы в данной категории не найдены.</p>
            </div>
          ) : (
            <div className="row">
              {filteredResources.map(resource => (
                <div className="col-md-4" key={resource.id}>
                  <div className="card mb-4 shadow-sm resource-card">
                    <img src={(!resource.image || resource.image.includes('kreslo')) ? (defaultImages[resource.title] || defaultImages.default) : resource.image} className="card-img-top resource-image" alt={resource.title} />
                    <div className="card-body">
                      <span className="badge bg-info mb-2">{resource.type}</span>
                      <h5 className="card-title">{resource.title}</h5>
                      <p className="card-text">{resource.description}</p>
                      {resource.link.startsWith('http') ? (
                        <a href={resource.link} className="btn btn-primary w-100" target="_blank" rel="noopener noreferrer">
                          Перейти к ресурсу
                        </a>
                      ) : (
                        <Link to={resource.link} className="btn btn-primary w-100">
                          Подробнее
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Предложение добавить ресурс */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2>Знаете полезный ресурс?</h2>
          <p className="lead">Помогите сообществу, поделившись полезными материалами по кибербезопасности.</p>
          <button className="btn btn-primary btn-lg">Предложить ресурс</button>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage; 