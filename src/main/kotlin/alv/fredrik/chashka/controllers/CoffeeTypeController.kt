package alv.fredrik.chashka.controllers

import alv.fredrik.chashka.entities.CoffeeTypeEntity
import alv.fredrik.chashka.repositories.CoffeeTypeRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("coffeeType")
class CoffeeTypeController(
    @Autowired
    val coffeeTypeRepository: CoffeeTypeRepository,
) {

    @GetMapping
    fun getAllCoffeeTypes(): Iterable<CoffeeTypeEntity> {
        return coffeeTypeRepository.findAll()
    }

    @GetMapping("/{id}")
    fun getCoffeeTypeById(@PathVariable("id") id: Long): CoffeeTypeEntity? {
        return coffeeTypeRepository.findByIdOrNull(id)
    }

    @PostMapping
    @PreAuthorize("hasAuthority('create:coffeeType')")
    fun createCoffeeType(): String {
        val entity = CoffeeTypeEntity(0, "Test coffee type", "Norway", setOf("Fruity"))
        val result = coffeeTypeRepository.save(entity)

        return result.id.toString()
    }

}