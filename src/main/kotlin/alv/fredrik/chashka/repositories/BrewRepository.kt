package alv.fredrik.chashka.repositories

import alv.fredrik.chashka.entities.BrewEntity
import org.springframework.data.repository.CrudRepository

interface BrewRepository : CrudRepository<BrewEntity, Long>