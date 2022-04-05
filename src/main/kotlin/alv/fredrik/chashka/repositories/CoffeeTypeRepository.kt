package alv.fredrik.chashka.repositories

import alv.fredrik.chashka.entities.CoffeeTypeEntity
import org.springframework.data.repository.CrudRepository

interface CoffeeTypeRepository : CrudRepository<CoffeeTypeEntity, Long>