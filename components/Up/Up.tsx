import { motion, useAnimation } from "framer-motion"
import { useScrollY } from "../../hooks/useScrollY"
import styles from "./Up.module.css"
import { useEffect } from "react"
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"
import { ButtonAppearance } from "../ButtonIcon/ButtonIcon.props"

export const Up = (): React.JSX.Element => {
  const controls = useAnimation()
  const y = useScrollY()

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight })
  }, [y, controls])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon
        appearance={ButtonAppearance.primary}
        icon="up"
        onClick={scrollToTop}
      />
    </motion.div>
  )
}
