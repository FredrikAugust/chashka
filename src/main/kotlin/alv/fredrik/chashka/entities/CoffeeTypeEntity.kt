package alv.fredrik.chashka.entities

import javax.persistence.*

@Entity
data class CoffeeTypeEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    val name: String,
    val originCountry: String,

    @ElementCollection
    val characteristics: Set<String>,
)
