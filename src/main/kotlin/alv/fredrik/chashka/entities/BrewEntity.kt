package alv.fredrik.chashka.entities

import javax.persistence.*

@Entity
data class BrewEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    val brewTimeInSeconds: Long,

    @ManyToOne
    val coffeeTypeEntity: CoffeeTypeEntity
)
