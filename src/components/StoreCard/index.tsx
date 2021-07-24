import styles from './StoreCard.module.scss'

type StoreCardProps = {
  name: string
  image: string
}

export function StoreCard({name, image}:StoreCardProps) {
  return(
    <div className={styles.container}>
      {image && <>
        <img src={image} alt={name} />
        <h1>Posto {name}</h1>
      </>}
    </div>
  )
}