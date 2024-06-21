import {createUseStyles} from 'react-jss'
import {Button, Input, Cross} from '../../ui-kit'
import {useState} from 'react'
import cn from 'classNames'
import {AppDispatch, RootState} from '../../storage/store'
import {useDispatch, useSelector} from 'react-redux'
import {setAccountData} from '../../storage/accountSlice'
import {useNavigate} from 'react-router-dom'

const images = [
  'https://psv4.userapi.com/c909518/u594770123/docs/d18/dbb1226b0d0c/background1.png',
  'https://psv4.userapi.com/c909518/u594770123/docs/d34/9d3c1e748174/background2.png',
  'https://psv4.userapi.com/c909518/u594770123/docs/d18/759dbf6c8c97/background3.png',
  'https://psv4.userapi.com/c909518/u594770123/docs/d7/6c5a60031268/background4.jpg',
]

export const AccountSettings = () => {
  const c = useStyles()
  const account = useSelector((state: RootState) => state.account)
  const [activeImage, setActiveImage] = useState(account.background)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  return (
    <div className={c.root}>
      <div className={c.content}>
        <div className={c.header}>
          <h2>Выберите тему</h2>
          <button className={c.cross} onClick={() => navigate('/settings')}>
            <Cross />
          </button>
        </div>
        <div className={c.images}>
          {images.map((el, i) => (
            <div
              className={cn(c.image, activeImage === el ? c.activeImage : undefined)}
              style={{backgroundImage: `url(${el})`}}
              key={i}
              onClick={() => {
                setActiveImage(el)
                dispatch(
                  setAccountData({
                    background: el,
                  })
                )
              }}
            />
          ))}
        </div>
      </div>
      <div className={c.content}>
        <h2>Изменить данные</h2>
        <Input placeholder='Имя' />
        <Input placeholder='Фамилия' />
        <Button text='Сохранить' />
      </div>
      <div className={c.content}>
        <h2>Изменить email</h2>
        <Input placeholder='Email' />
        <Button text='Сохранить' />
      </div>
      <div className={c.content}>
        <h2>Изменить пароль</h2>
        <Input placeholder='Новый пароль' />
        <Input placeholder='Подтверждение пароля' />
        <Button text='Сохранить' />
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  root: {
    backgroundColor: 'rgba(196, 196, 196, 0.4)',
    padding: [40, 20],
    color: 'white',
    gap: 40,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 24,
    position: 'relative',
  },
  cross: {
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
    backgroundSize: '180%',
    backgroundPositionX: 'right',
    margin: 5,
  },
  images: {
    display: 'flex',
    gap: 6,
  },
  activeImage: {
    margin: 0,
    border: '5px solid #37CEBF',
  },
})
